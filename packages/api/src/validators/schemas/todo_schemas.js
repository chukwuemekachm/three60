export const createTodoSchema = {
  title: 'required|string|min:2|max:100',
  description: 'string|min:2|max:2000',
  status: 'string|in:BACKLOG,IN_PROGRESS',
  'tags.*.title': 'required|string|min:2|max:15',
  'tags.*.color': 'hex|size:6',
  'items.*.title': 'required|string|min:2|max:15'
}

export const updateTodoSchema = {
  ...createTodoSchema,
  status: 'string|in:BACKLOG,IN_PROGRESS,FINISHED,TRASH',
  'items.*.status': 'string|in:BACKLOG,IN_PROGRESS,FINISHED'
}
