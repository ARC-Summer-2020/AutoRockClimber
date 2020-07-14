import math

def dijkstras(graph: dict, start, end):
    # Eventually add errors to throw for no start or no end node
    # print(graph.keys())
    if len(graph.keys()) == 0:
        return 'No vertex found in graph'
    if start not in graph: #graph.has_key(start):
        return '\'{}\' as a start node not found'.format(start)
    if end not in graph: #graph.has_key(end):
        return '\'{}\' as an end node not found'.format(end)
    
    finished_path = []
    min_distance_to = {}
    nodes_visited = {}
    vertex_set = {}
    total_distance = 0
    for v in graph.keys():
        min_distance_to[v] = math.inf
        # previous_node[v] = None # Take out?
        nodes_visited[v] = False
        vertex_set[v] = graph[v]
    min_distance_to[start] = 0
    nodes_visited[start] = True
    finished_path.append(start)

    current_node = start
    next_node = ''
    while len(vertex_set) and current_node is not end:
        list_of_dist = vertex_set.pop(current_node)
        minimum_distance = math.inf
        for neighbor in list_of_dist:
            potential_node, distance = neighbor
            if distance < minimum_distance and not nodes_visited[potential_node]:
                minimum_distance = distance
                next_node = potential_node
            if potential_node is end:
                finished_path.append(potential_node)
                total_distance += distance
                return total_distance, finished_path

        nodes_visited[next_node] = True
        finished_path.append(next_node)
        total_distance += minimum_distance
        current_node = next_node
    
    if end not in finished_path:
        return 'The proclaimed end vertex \'{}\' was not reached. Instead the path \'{}\' was found'.format(end, finished_path)
    return total_distance, finished_path

# endstuff = dijkstras({'a': [('b', 1)], 'b': [('a', 1)]}, 'a', 'b')
# print(endstuff)