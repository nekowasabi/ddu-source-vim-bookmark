import {
  BaseSource,
  DduOptions,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v3.10.2/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.10.2/deps.ts";
import { ensure, is } from "https://deno.land/x/unknownutil@v3.15.0/mod.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.7.1/file.ts";

type Params = Record<never, never>;

type Bookmark = {
  path: string;
  line: number;
  word: string;
  annotation?: string;
};

type Bookmarks = Bookmark[];

export class Source extends BaseSource<Params> {
  override kind = "bookmark";

  override gather(args: {
    denops: Denops;
    options: DduOptions;
    sourceOptions: SourceOptions;
    sourceParams: Params;
    input: string;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        const tree = async () => {
          const items: Item<ActionData>[] = [];

          try {
            const bookmarksData = ensure(
              await args.denops.call("bm#location_list"),
              is.ArrayOf(is.String),
            );
            const bookmarks: Bookmarks = [];
            for (const bookmarkData of bookmarksData) {
              const d = bookmarkData.split(":");
              const b: Bookmark = {
                path: d[0],
                line: Number(d[1]),
                word: d[2],
                annotation: d[3],
              };
              bookmarks.push(b);
            }
            for (const bookmark of bookmarks) {
              items.push({
                word: bookmark.word === "Annotation" && bookmark.annotation
                  ? bookmark.annotation + " / " + bookmark.path
                  : bookmark.path + " " + bookmark.word,
                action: {
                  path: bookmark.path,
                  lineNr: bookmark.line,
                },
              });
            }
          } catch (e: unknown) {
            console.error(e);
          }

          return items;
        };

        controller.enqueue(
          await tree(),
        );

        controller.close();
      },
    });
  }

  override params(): Params {
    return {};
  }
}
