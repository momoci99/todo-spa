interface TodoItem {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  isCompleted: boolean;
  categories?: Array<string>;
}

interface TodoCategory {
  id: string;
  name: string;
}

export type { TodoItem, TodoCategory };
