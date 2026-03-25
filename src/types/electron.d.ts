declare global {
  interface Window {
    modelService: {
      getModels: () => Promise<Array<{
        name: string;
        description: string;
        endpoint: string;
        model: string;
        token: string;
        headers: Record<string, string>;
      }>>;
      addModel: (model: {
        name: string;
        description: string;
        endpoint: string;
        model: string;
        token: string;
        headers: Record<string, string>;
      }) => Promise<void>;
      updateModel: (model: {
        name: string;
        description: string;
        endpoint: string;
        model: string;
        token: string;
        headers: Record<string, string>;
      }) => Promise<void>;
      deleteModel: (name: string) => Promise<void>;
      testModelService: (model: {
        name: string;
        description: string;
        endpoint: string;
        model: string;
        token: string;
        headers: Record<string, string>;
      }) => Promise<boolean>;
    };
    toolService: {
      getMcpServers: () => Promise<Array<{
        name: string;
        type: string;
        url: string;
        command: string;
        args: string[];
      }>>;
      addMcpServer: (server: {
        name: string;
        type: string;
        url: string;
        command: string;
        args: string[];
      }) => Promise<void>;
      updateMcpServer: (server: {
        name: string;
        type: string;
        url: string;
        command: string;
        args: string[];
      }) => Promise<void>;
      deleteMcpServer: (name: string) => Promise<void>;
    };
  }
}

export {};
