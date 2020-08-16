export const createLinkSchema = {
  name: 'string|min:2|max:30',
  url: 'required|url',
  folderId: 'string|min:2|max:50',
  'tags.*.title': 'required|string|min:2|max:15',
  'tags.*.color': 'hex|size:6',
}

export const updateLinkSchema = {
  ...createLinkSchema,
  url: 'url',
}
