
# open-docx

This tool allows you to quickly split open a docx file. It is not a smart tool, it has no magic,
and its interface is less than stellar. It is really meant to just unzip a docx and reformat the XML
for human legibility.

## Installation

    npm install open-docx

This will make a `open-docx` tool available on your command line.

## Usage

**NOTE**: This tool largely shells out a lot. It assumes you have the following in your path:
`cp`, `unzip`, and `xmllint`.

Just run:

    open-docx path/to/document.docx output/directory

The output directory must not exist and will be created (but not at arbitrary depth).
