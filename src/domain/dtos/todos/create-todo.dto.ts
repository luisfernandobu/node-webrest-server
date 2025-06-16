export class CreateTodoDto {

    private constructor(
        public readonly text: string,
    ) {}

    static create (props: {[key: string]: any}): [string?, CreateTodoDto?] {
        if (!props || Object.keys(props).length === 0) return ['Request cannot be empty'];

        const { text } = props;
        if (!text) return ['text property is required'];

        return [undefined, new CreateTodoDto(text)];
    }
}
