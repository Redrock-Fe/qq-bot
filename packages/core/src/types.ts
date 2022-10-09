import type {Helper} from './Helper';

export type initFn<
  T = never,
  MustNeedConfig extends boolean = false
> = MustNeedConfig extends false
  ? (helper: Helper, config?: T) => void
  : (helper: Helper, config: T) => void;

export interface Plugin<T = never, MustNeedConfig extends boolean = false> {
  init: initFn<T, MustNeedConfig>;
  name?: string;
  config?: T;
}
