# ddu-source-vim-bookmark

## Description

Ddu.vim's source.\
Integrate with [vim-bookmark](https://github.com/MattesGroeger/vim-bookmarks)

## Required

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [ddu.vim](Shougo/ddu.vim)
- [vim-bookmark](https://github.com/MattesGroeger/vim-bookmarks)

## Install

```
Plug 'nekowasabi/ddu-source-vim-bookmark'
```

## Usage

### execute
```vim
nnoremap <silent> <Leader>b
  \ <Cmd>call ddu#start({'sources': [{'name': 'vim-bookmark'}]})<CR>

call ddu#custom#patch_global(#{
    \   kindOptions: #{
    \     bookmark: #{
    \       defaultAction: 'open',
    \     },
    \   }
    \ })
```

### kind
- clear: clear selected bookmark.
```
