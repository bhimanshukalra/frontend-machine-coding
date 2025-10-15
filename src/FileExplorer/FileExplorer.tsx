import { useState } from "react";
import { fileExplorerData, type FileExplorer } from "./data";

const MARGIN_LEFT = 20;

const Folder = ({
  data,
  marginLeft,
  addNewFolder,
  removeFolder,
}: {
  data: FileExplorer;
  marginLeft: number;
  addNewFolder: (id: number) => void;
  removeFolder: (folderId: number) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div style={{ marginLeft: marginLeft }}>
      <p>
        <button onClick={toggleIsExpanded}>{isExpanded ? "-" : "+"}</button> 🗂️{" "}
        {data.label}{" "}
        <button onClick={() => addNewFolder(data.id)}>{"Add folder"}</button>{' '}
        <button onClick={() => removeFolder(data.id)}>{"Remove folder"}</button>
      </p>
      {isExpanded &&
        data.children?.map((item) => (
          <FileExplorerItem
            data={item}
            marginLeft={marginLeft}
            key={JSON.stringify(item)}
            addNewFolder={addNewFolder}
            removeFolder={removeFolder}
          />
        ))}
    </div>
  );
};

const File = ({
  data,
  marginLeft,
  addNewFolder,
  removeFolder,
}: {
  data: FileExplorer;
  marginLeft: number;
  addNewFolder: (id: number) => void;
  removeFolder: (id: number) => void;
}) => {
  return (
    <div style={{ marginLeft: marginLeft }}>
      <p>
        📂 {data.label}{' '}
        <button onClick={() => addNewFolder(data.id)}>{"Add folder"}</button>{' '}
        <button onClick={() => removeFolder(data.id)}>{"Remove file"}</button>
      </p>
    </div>
  );
};

const FileExplorerItem = ({
  data,
  marginLeft,
  addNewFolder,
  removeFolder,
}: {
  data: FileExplorer;
  marginLeft: number;
  addNewFolder: (id: number) => void;
  removeFolder: (id: number) => void;
}) => {
  return data.type === "file" ? (
    <File
      data={data}
      marginLeft={marginLeft + MARGIN_LEFT}
      addNewFolder={addNewFolder}
      removeFolder={removeFolder}
    />
  ) : (
    <Folder
      data={data}
      marginLeft={marginLeft + MARGIN_LEFT}
      addNewFolder={addNewFolder}
      removeFolder={removeFolder}
    />
  );
};

export default function FileExplorer() {
  const [data, setData] = useState(fileExplorerData);

  const addNewFolder = (parentId: number) => {
    const updateTree = (list: FileExplorer[]) => {
      return list.map((item) => {
        if (item.id === parentId) {
          const res: FileExplorer = {
            ...item,
            children: item.children
              ? [
                  ...item.children,
                  {
                    id: 40,
                    label: "NewFolder",
                    type: "folder",
                  },
                ]
              : undefined,
          };
          return res;
        }
        if (item.children) {
          const res: FileExplorer = {
            ...item,
            children: item.children ? updateTree(item.children) : undefined,
          };
          return res;
        }
        return item;
      });
    };

    setData((prev) => updateTree(prev));
  };

  const removeFolder = (folerId: number) => {
    const updateTree = (list: FileExplorer[]) => {
      return list
        .filter((child) => child.id !== folerId)
        .map((item) => {
          if (item.children) {
            const res: FileExplorer = {
              ...item,
              children: updateTree(item.children),
            };
            return res;
          }
          return item;
        });
    };

    setData((prev) => updateTree(prev));
  };

  return (
    <div>
      {data.map((item) => (
        <FileExplorerItem
          data={item}
          key={item.id}
          marginLeft={-1 * MARGIN_LEFT}
          addNewFolder={addNewFolder}
          removeFolder={removeFolder}
        />
      ))}
    </div>
  );
}
