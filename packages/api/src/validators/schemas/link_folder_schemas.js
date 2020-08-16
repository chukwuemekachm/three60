export const createLinkFolderSchema = {
  name: 'required|string|min:2|max:100',
  description: 'string|min:2|max:150'
}

export const updateLinkFolderSchema = {
  ...createLinkFolderSchema,
  name: 'string|min:2|max:100'
}
