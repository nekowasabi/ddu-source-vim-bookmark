import {
  ActionArguments,
  ActionFlags,
  BaseKind,
  DduItem,
  PreviewContext,
} from "https://deno.land/x/ddu_vim@v3.10.2/types.ts";
import { Denops, fn, vars } from "https://deno.land/x/ddu_vim@v3.10.2/deps.ts";

export type ActionData = {
  path: string;
};

type Params = Record<never, never>;

export class Kind extends BaseKind<Params> {
  override actions: Record<
    string,
    (args: ActionArguments<Params>) => Promise<ActionFlags>
  > = {};
}
