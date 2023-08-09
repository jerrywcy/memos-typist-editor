import { TaskItem } from '@tiptap/extension-task-item'

const RichTextTaskItem = TaskItem.extend({
    addInputRules() {
        return []
    },
})

export { RichTextTaskItem }
