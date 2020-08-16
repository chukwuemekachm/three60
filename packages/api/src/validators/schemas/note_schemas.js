export const createNoteSchema = {
  title: 'required|string|min:2|max:100',
  content: 'string|min:2|max:5000',
  'tags.*.title': 'required|string|min:2|max:15',
  'tags.*.color': 'hex|size:6'
}

export const updateNoteSchema = {
  ...createNoteSchema,
  title: 'string|min:2|max:100'
}
