import reorder from './reorder.gif';
import reassign from './reassign.gif';

function Home() {
  return (
    <main className="MainContent">
      <div className="HomeContainer">
        <h1 className="HomeParagraph">
          Gira is a site that allows you to create tasks / issues and manage
          them
        </h1>
        <h1 className="HomeParagraph">
          You can assign issues to 4 different states of progression:
        </h1>
        <div className="StatusPresentation Todo">To do</div>
        <div className="StatusPresentation InProgress">In Progress</div>
        <div className="StatusPresentation InReview">In Review</div>
        <div className="StatusPresentation Done">Done</div>
        <h1 className="HomeParagraph">
          Then order issues within these states of progression
        </h1>
        <img src={reorder} alt="reordering" />
        <h1 className="HomeParagraph">and drag and drop in between them</h1>
        <img src={reassign} alt="reassigning" />
      </div>
    </main>
  );
}

export default Home;
