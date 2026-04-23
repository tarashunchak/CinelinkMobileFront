export class MessagesQueue {
  private queue: any[] = new Array();

  public push(item: any) {
    this.queue.push(item);
  };

  public pop(): any {
    const item = this.queue.at(0);
    this.queue = this.queue.slice(1, this.queue.length - 1);
    return item;
  };

  public clear() {
    this.queue = new Array();
  };
};