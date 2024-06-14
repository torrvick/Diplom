import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ToDoEl from './ToDoEl';

const renderers = {
	li(props) {
		const { children, className } = props;
		if (className === 'task-list-item') {
			const [checkbox, ...label] = children;
			const isChecked = checkbox.props.checked;
			return <ToDoEl isChecked={isChecked} label={label} />;
		}

		return <li>{children}</li>;
	},
	code(props) {
		const { children, className, node, ...rest } = props;
		const match = /language-(\w+)/.exec(className || '');
		const language = match ? match[1] : 'bash';

		return (
			<SyntaxHighlighter
				{...rest}
				children={String(children).replace(/\n$/, '')}
				language={language}
				style={vscDarkPlus}
				wrapLongLines={true}
				customStyle={{
					whiteSpace: 'wrap',
					wordBreak: 'break-word',
				}}
			/>
		);
	},
};

export default renderers;
