import {
  ActionFlags,
  Actions,
  BaseKind,
  Context,
  DduItem,
  PreviewContext,
  Previewer,
} from "https://deno.land/x/ddu_vim@v3.10.2/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.10.2/deps.ts";
import { is, maybe } from "https://deno.land/x/unknownutil@v3.15.0/mod.ts";

export type ActionData = {
  path: string;
  info?: string;
};

type Params = Record<never, never>;

const isDduItemAction = is.ObjectOf({ path: is.String, lineNr: is.Number });

export const BookmarkAction: Actions<Params> = {
  open: async (args: {
    denops: Denops;
    context: Context;
    actionParams: unknown;
    items: DduItem[];
  }) => {
    const action = args.items[0]["action"] as { path: string; lineNr: number };
    await args.denops.cmd("edit +" + action.lineNr + " " + action.path);
    return Promise.resolve(ActionFlags.None);
  },
  clear: async (args: {
    denops: Denops;
    context: Context;
    actionParams: unknown;
    items: DduItem[];
  }) => {
    // 分割代入
    const { denops, items } = args;

    try {
      for (const item of items) {
        // unknownutilのmaybe関数便利
        const action = maybe(item?.action, isDduItemAction);

        if (!action) {
          return ActionFlags.None;
        }

        await denops.call(
          "bm#del_bookmark_at_line",
          action.path,
          action.lineNr,
        );
      }
    } catch {
    }

    console.log("bookmarks cleared");
    return ActionFlags.None;
  },
};

export class Kind extends BaseKind<Params> {
  override actions = BookmarkAction;
  override getPreviewer(args: {
    denops: Denops;
    item: DduItem;
    actionParams: unknown;
    previewContext: PreviewContext;
  }): Promise<Previewer | undefined> {
    const action = args.item.action as ActionData;
    if (!action) {
      return Promise.resolve(undefined);
    }

    return Promise.resolve({
      kind: "buffer",
      path: action.path,
    });
  }

  override params(): Params {
    return {};
  }
}
