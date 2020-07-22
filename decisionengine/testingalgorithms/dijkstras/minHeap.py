import heapq

class MinHeap(object):
    def __init__(self):
        self.heap = []
        self.items = {}
        self.counter = 0

    def is_empty(self):
        return not self.counter > 0

    def insert(self, item, priority):
        if item in self.items:
            self.remove(item)
        entry = [priority, item, True]
        self.counter += 1
        self.items[item] = entry
        heapq.heappush(self.heap, entry)

    def remove(self, item):
        entry = self.items[item]
        entry[-1] = False
        self.counter -= 1

    def del_min(self):
        while self.heap:
            _, item, is_active = heapq.heappop(self.heap)
            if is_active:
                self.counter -= 1
                del self.items[item]
                return item