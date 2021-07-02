import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as zoomStrategy} from '@giorgosavgeris/passport-zoom-oauth2';
import UsersDAO from '../dao/usersDAO';
import {compareHash} from '../service/encrypt.service';
import ZoomDAO from '../dao/zoomDAO';
import { updateAccessToken } from '../util/zoom';
passport.use(new LocalStrategy(
  {usernameField: 'email', passwordField: 'password'},
  async function(email, password, done) {
    let { error, result } = await UsersDAO.findByEmail(email);

    if (error) { return done(error)};

    if (!result) {return done(null, false)};
    
    let compareResult = await compareHash(password, result.hash)

    if (!(compareResult.result)) {return done(null, false)};

    return done(null, result);
  }
));
//Deciding not to use user accounts to create rooms Easily could integrate with this code
const oauthImpl = new zoomStrategy(
  {
  authorizationURL: 'https://zoom.us/oauth/authorize',
  tokenURL: 'https://zoom.us/oauth/token',
  clientID: process.env.ZOOM_CLIENT_ID,
  clientSecret: process.env.ZOOM_CLIENT_SECRET,
  callbackURL: `${process.env.NGROK_URL}/api/auth/zoom/callback`,
},
async function(accessToken, refreshToken, profile, cb) {
  let {error, result: user} = await ZoomDAO.findOrCreate({ zoomId: profile.id, name: profile.displayName, email: profile.emails, accessToken, refreshToken, type: 'zoomAdmin' });
  if (!error) {
    setTimeout(() => {
      updateAccessToken(user._id, refreshToken)
      //Execute after 55 minutes (1 hour tokens expire);
    }, 1000*60*55);
  }
  return cb(error, user);
})
// }
passport.use( oauthImpl);


passport.serializeUser(function(entity, done) {
  done(null, {id: entity._id, type: entity.type});
});

passport.deserializeUser(async ({id, type }, done) => {
  if (type == "zoomAdmin") {
     let {error, result} = await ZoomDAO.findById(id);
     if(error){
      done(error, false);
    } else {
      done(null, result);
    }
  } else {
     let {error, result} = await UsersDAO.findById(id);
     if(error){
      done(error, false);
  } else {
      done(null, result);
  }
  }
    
});

    export default passport;