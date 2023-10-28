import passport from 'passport';
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions,
} from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';
import bcrypt from 'bcrypt';

/**
 * Create the strategy used for checking and parsing the JWT sent by the client.
 */
function setupJwtStrategy(): void {
    const strategyOptions: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
    };

    passport.use(
        new JwtStrategy(strategyOptions, async (payload, done) => {
            const user = await User.findOne({
                email: payload.sub,
            });
            if (!user) {
                return done(null, false);
            }

            done(null, user);
        }),
    );
}

/**
 * Create the strategy used for the login route to check the credentials.
 */
function setupLocalStrategy(): void {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                const user = await User.findOne({
                    email,
                });
                if (!user) {
                    return done(null, false);
                }

                if (!(await bcrypt.compare(password, user.password))) {
                    return done(null, false);
                }

                done(null, user);
            },
        ),
    );
}

/**
 * Provide both authentication strategies to passport.
 */
export const setupAuth = (): void => {
    setupJwtStrategy();
    setupLocalStrategy();
};
