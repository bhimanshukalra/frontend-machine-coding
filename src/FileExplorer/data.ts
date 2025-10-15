export type FileExplorer = {
  id: number;
  label: string;
  type: "folder" | "file";
  children?: FileExplorer[];
  // isExpanded:boolean;
};
// export type FileExplorer = Folder | File;

// export type Folder = {
//   label: string;
//   type: "folder";
//   children: FileExplorer[];
//   isExpanded: boolean;
// };

// export type File = {
//   label: string;
//   type: "file";
//   // children: FileExplorer[];
//   // isExpanded:boolean;
// };

export const fileExplorerData: FileExplorer[] = [
  {
    id: 1,
    label: "root",
    type: "folder",
    children: [
      {
        id: 2,
        label: "public",
        type: "folder",
        children: [
          {
            id: 3,
            label: "public nested 1",
            type: "folder",
            children: [
              {
                id: 4,
                label: "index.html",
                type: "file",
              },
              {
                id: 5,
                label: "hello.html",
                type: "file",
              },
            ],
          },
          {
            id: 6,
            label: "public nested 1",
            type: "file",
          },
        ],
      },
      {
        id: 7,
        label: "src",
        type: "folder",
        children: [
          {
            id: 8,
            label: "App.js",
            type: "file",
          },
          {
            id: 9,
            label: "Index.js",
            type: "file",
          },
          {
            id: 10,
            label: "styles.css",
            type: "file",
          },
        ],
      },
      {
        id: 11,
        label: "package.json",
        type: "file",
      },
    ],
  },
];
