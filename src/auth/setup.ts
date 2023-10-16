import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';
import bcrypt from 'bcrypt';

function setupJwtStrategy(): void {
    const strategyOptions: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
    };

    passport.use(new JwtStrategy(strategyOptions, async (payload, done) => {
        const user = await User.find({
            email: payload.sub
        });
        if (!user) {
            return done(null, false);
        }

        done(null, user);
    }));
}

function setupLocalStrategy(): void {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return done(null, false);
        }

        if (!await bcrypt.compare(password, user.password)) {
            return done(null, false);
        }

        done(null, user);
    }));
}

export const setupAuth = (): void => {
    setupJwtStrategy();
    setupLocalStrategy();
}