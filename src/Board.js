import DragNDrop from './DragNDrop';
import { useClient } from './auth-context';

function Board() {
  async function useIssues() {
    const client = useClient();
    const issues = await client('issues');
    console.log('my issues', issues);
    return issues;
  }

  useIssues();

  const data = [
    { title: 'to do', items: ['1', '2', '3', '4', '5', '6'] },
    { title: 'in progress', items: ['7', '8'] },
    { title: 'in review', items: ['9'] },
    { title: 'done', items: ['10'] },
  ];

  return (
    <main className="MainContent Board">
      <DragNDrop data={data} />
    </main>
  );
}

export default Board;
