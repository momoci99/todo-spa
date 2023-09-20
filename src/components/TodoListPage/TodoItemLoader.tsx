import ContentLoader from "react-content-loader";

const TodoItemLoader = () => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 300 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="22" y="0" rx="5" ry="5" width="275" height="50" />
    <rect x="22" y="60" rx="5" ry="5" width="275" height="50" />
    <rect x="22" y="120" rx="5" ry="5" width="275" height="50" />
    <rect x="22" y="180" rx="5" ry="5" width="275" height="50" />
    <rect x="22" y="240" rx="5" ry="5" width="275" height="50" />
    <rect x="22" y="300" rx="5" ry="5" width="275" height="50" />
  </ContentLoader>
);

export default TodoItemLoader;
