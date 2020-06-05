import lodash from './global'

type _ = typeof lodash

declare global {
    const _: _;
}