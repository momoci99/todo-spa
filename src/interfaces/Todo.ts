interface TodoCategory {
  id: string;
  name: string;
}

interface TodoItem {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  isCompleted: boolean;
  categoryIds: Array<string>;
}

interface DetailedTodoCategory extends TodoCategory {
  isActivated?: boolean;
}

export type { TodoItem, TodoCategory, DetailedTodoCategory };
