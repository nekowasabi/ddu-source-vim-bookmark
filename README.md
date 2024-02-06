# ddu-source-vim-bookmark

## Description

Ddu.vim's source. Integrate with\
[vim-bookmark](https://github.com/MattesGroeger/vim-bookmarks)

## Required

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [ddu.vim](Shougo/ddu.vim)
- [vim-bookmark](https://github.com/MattesGroeger/vim-bookmarks)

## Install

```
Plug 'nekowasabi/ddu-source-vim-bookmark'
```

## Usage

```vim
nnoremap <silent> <Leader>b
  \ <Cmd>call ddu#start({'sources': [{'name': 'vim-bookmark'}]})<CR>
```
