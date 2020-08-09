import math
from decisionengine.min_heap import MinHeap


class Dijkstras:
    """
    Shortest path implementation to be used for a climber on the wall.
    """
    def dijkstras(self, graph: dict, start, end):
        """Base mathematical function that arc uses to guide the path.

        Args:
            graph (dict): Graph of the rocks on the wall.
            Each key is a node, and each node is a list of tuples that node
            connects to via an edge. The first part of the tuple is the node.
            The second part of the tuple is the distance and complexity value
            of the edge.
            start (char || tuple): Node that starts the route
            end (char || tuple): Node that ends the route

        Throws:
            TODO: Currently returns a string of the error. Will add
            exception handling later down the line. 

        Returns:
            Tuple: (distance of path, path from start to end)
        """
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
        while not self.heap.is_empty():
            current_node = self.heap.del_min()
            self._minimum_distance(current_node, vertex_set[current_node])

        if not self.end_path:
            return 'The proclaimed end vertex \'{}\' was not reached. \
                    Instead the paths \'{}\' was found'\
                        .format(end, self.previous_nodes)
        return self.end_path

    def _minimum_distance(self, current_node, list_of_nodes: list):
        """Helper method to evaluate the next closest node to check.
        If a node is not the end and it is sufficiently small,
        it will be added to the priority heap.

        Args:
            current_node ([type]): Current node to be evaluated.
            list_of_nodes (list): List of nodes to be evaluated.
        """
        for neighbor in list_of_nodes:
            potential_node, distance = neighbor
            distance = distance + self.min_distance_to[current_node]
            if distance < self.min_distance_to[potential_node] and \
                    current_node not in self.previous_nodes[potential_node]:
                self.min_distance_to[potential_node] = distance
                self.previous_nodes[potential_node] = \
                    [node for node in self.previous_nodes[current_node]]
                self.previous_nodes[potential_node].append(potential_node)
                if potential_node is not self.end:
                    self.heap.insert(
                        potential_node,
                        self.min_distance_to[potential_node]
                        )
                else:
                    self.end_path = (
                        self.min_distance_to[potential_node],
                        self.previous_nodes[potential_node]
                        )
