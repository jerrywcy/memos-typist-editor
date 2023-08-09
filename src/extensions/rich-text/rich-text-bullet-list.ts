import { InputRule, wrappingInputRule } from '@tiptap/core'
import { BulletList } from '@tiptap/extension-bullet-list'
import { TextStyle } from '@tiptap/extension-text-style'

export const inputRegex = /^\s*([-+*])\s$/
export const taskItemRegex = /^\s*(\[([( |x])?\])\s$/

const RichTextBulletList = BulletList.extend({
    addInputRules() {
        let inputRule = wrappingInputRule({
            find: inputRegex,
            type: this.type,
        })

        if (this.options.keepMarks || this.options.keepAttributes) {
            inputRule = wrappingInputRule({
                find: inputRegex,
                type: this.type,
                keepMarks: this.options.keepMarks,
                keepAttributes: this.options.keepAttributes,
                getAttributes: () => {
                    return this.editor.getAttributes(TextStyle.name)
                },
                editor: this.editor,
            })
        }

        const taskItemRule = new InputRule({
            find: taskItemRegex,
            handler: (props) => {
                props.chain().deleteRange(props.range).toggleList('taskList', 'taskItem').run()
            },
        })
        return [inputRule, taskItemRule]
    },
})

export { RichTextBulletList }
