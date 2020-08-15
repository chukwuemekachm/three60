export const createNoteSchema = {
  title: 'required|string|min:2|max:100',
  content: 'string|min:2|max:5000',
  'tags.*.title': 'required|string|min:2|max:15',
  'tags.*.color': 'string|min:4|max:7'
}

export const updateNoteSchema = {
  ...createNoteSchema,
  title: 'string|min:2|max:100'
}
