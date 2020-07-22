import math
from minHeap import MinHeap

class Dijkstras:
    def dijkstras(self, graph: dict, start, end):
        # Eventually add errors to throw for no start or no end node
        # print(graph.keys())
        if len(graph.keys()) == 0:
            return 'No vertex found in graph'
        if start not in graph:
            return '\'{}\' as a start node not found'.format(start)
        if end not in graph:
            return '\'{}\' as an end node not found'.format(end)
        
        self.graph = graph
        self.start = start
        self.end = end
        self.end_path = None
        
        self.min_distance_to = {}
        self.previous_nodes = {}
        vertex_set = {}
        self.heap = MinHeap()
        for v in graph.keys():
            self.min_distance_to[v] = math.inf
            self.previous_nodes[v] = []
            vertex_set[v] = graph[v]
        self.previous_nodes[start] = [start]
        self.min_distance_to[start] = 0
        self.heap.insert(start, self.min_distance_to[start])

        current_node = start
        next_node = ''
        while not self.heap.is_empty():
            current_node = self.heap.del_min()
            self.minimum_distance(current_node, vertex_set[current_node])


        if not self.end_path:
            return 'The proclaimed end vertex \'{}\' was not reached. Instead the paths \'{}\' was found'.format(end, self.previous_nodes)
        return self.end_path

    def minimum_distance(self, current_node, list_of_dist: list):
        min_distance = math.inf

        for neighbor in list_of_dist:
            potential_node, distance = neighbor
            distance = distance + self.min_distance_to[current_node]
            if distance < self.min_distance_to[potential_node] and current_node not in self.previous_nodes[potential_node]:
                self.min_distance_to[potential_node] = distance
                self.previous_nodes[potential_node] = [node for node in self.previous_nodes[current_node]]
                self.previous_nodes[potential_node].append(potential_node)
                if potential_node is not self.end:
                    self.heap.insert(potential_node, self.min_distance_to[potential_node])
                else:
                    self.end_path = (self.min_distance_to[potential_node], self.previous_nodes[potential_node])


endstuff = Dijkstras().dijkstras({'a': [('b', 1)], 'b': [('a', 1)]}, 'a', 'b')
print(endstuff)