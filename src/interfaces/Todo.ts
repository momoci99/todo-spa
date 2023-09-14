interface TodoCategory {
  id: string;
  name: string;
  backgroundColor: string;
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

export type { DetailedTodoCategory, TodoCategory, TodoItem };
