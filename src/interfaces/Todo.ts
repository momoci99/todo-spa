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

interface DetailedTodoCategory extends TodoCategory {
  isActivated?: boolean;
}

export type { TodoItem, TodoCategory, DetailedTodoCategory };
