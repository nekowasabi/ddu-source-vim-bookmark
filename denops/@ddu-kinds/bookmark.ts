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

export type ActionData = {
  path: string;
  info?: string;
};

type Params = Record<never, never>;

export const BookmarkAction: Actions<Params> = {
  aaa: {
    description: "Remove bookmark",
    callback: async (
      args: { denops: Denops; context: Context; items: DduItem[] },
    ) => {
      // ここでbm#del_bookmark_at_lineを実行
      for (const item of args.items) {
        console.log("here");
      }
      // 終わったらUIを閉じる
      return Promise.resolve(ActionFlags.None);
    },
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
