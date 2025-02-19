type FilePath = string;
type Specifier = string;
type Identifier = string;

type ImportItems = Set<Identifier>;

export type ImportedModule = {
  specifier: Specifier;
  symbols: ImportItems;
  hasStar: boolean;
  isReExport: boolean;
  isReExportedBy: Set<string>;
};

export type Imports = Map<FilePath, ImportedModule>;

export type UnresolvedImport = { specifier: string; pos?: number; line?: number; col?: number };
