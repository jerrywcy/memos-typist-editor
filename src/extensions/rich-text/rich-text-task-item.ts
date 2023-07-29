import { wrappingInputRule } from '@tiptap/core'
import { TaskItem } from '@tiptap/extension-task-item'

const inputRegex = /^\s*(\[([( |x])?\])\s$/

const RichTextTaskItem = TaskItem.extend({
    addInputRules() {
        return [
            wrappingInputRule({
                find: inputRegex,
                type: this.type,
                getAttributes: (match) => ({
                    checked: match[match.length - 1] === 'x',
                }),
            }),
        ]
    },
})

export { RichTextTaskItem }
