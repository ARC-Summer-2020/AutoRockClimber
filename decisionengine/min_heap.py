import heapq


class MinHeap(object):
    """
    Class to keep track of where everything is in the priority queue.
    """
    def __init__(self):
        self.heap = []
        self.items = {}
        self.counter = 0

    def is_empty(self):
        """Returns whether priority queue is true or not.

        Returns:
            bool: True if empty
        """
        return not self.counter > 0

    def insert(self, item, priority):
        """Inserts item and into the priority queue with its priority.

        Args:
            item (char || tuple): Node to be inserted
            priority (int): Priority of given item
        """
        if item in self.items:
            self.remove(item)
        entry = [priority, item, True]
        self.counter += 1
        self.items[item] = entry
        heapq.heappush(self.heap, entry)

    def remove(self, item):
        """Removes item from heap

        Args:
            item (char || tuple): Node to be removed
        """
        entry = self.items[item]
        entry[-1] = False
        self.counter -= 1

    def del_min(self):
        """Pops the node with the highest priority.

        Returns:
            char || tuple: The node with highest priority
        """
        while self.heap:
            _, item, is_active = heapq.heappop(self.heap)
            if is_active:
                self.counter -= 1
                del self.items[item]
                return item
