export type JwtPayload = {
    username: string;
    sub: string;
}

export const jwtConstants = {
    secret: 'secretkey'
}

