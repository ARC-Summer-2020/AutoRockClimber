import unittest
from decisionengine.dijkstras import Dijkstras


class DijkstrasTest(unittest.TestCase):
    """
    Class that tests the graphs for dijkstras algorithm.
    Each graph is a dictionary of node-edge pairs,
    where the keys are char || tuple and the values are list[char || tuple].
    Each graph, a is the start and b is the end.
    """
    def setUp(self):
        # Small and basic graphs
        self.g1 = {'a': [('b', 1)],
                   'b': [('a', 1)]}

        self.g2 = {'a': [('c', 1), ('b', 2)],
                   'b': [('a', 2)],
                   'c': [('a', 1)]}

        self.g3 = {'a': [('c', 2)],
                   'b': [('c', 1)],
                   'c': [('a', 2), ('b', 1)]}

        # Cyclical Graphs
        self.g4 = {'a': [('c', 1), ('d', 1)],
                   'b': [('c', 1), ('d', 1)],
                   'c': [('a', 1), ('b', 1)],
                   'd': [('a', 1), ('b', 1)]}

        self.g5 = {'a': [('c', 1), ('d', 1)],
                   'b': [('e', 1)],
                   'c': [('a', 1), ('d', 1), ('e', 1)],
                   'd': [('a', 1), ('c', 1), ('e', 1)],
                   'e': [('b', 1)]}

        # Cyclical and end is disconnected
        self.g6 = {'a': [('d', 1), ('c', 1)],
                   'b': [],
                   'c': [('a', 1), ('d', 1)],
                   'd': [('a', 1), ('c', 1)]}

        self.g10 = {'a': [('c', 1), ('d', 1)],
                    'b': [],
                    'c': [('a', 1)],
                    'd': [('a', 1)]}

        # Random node disconnected
        self.g7 = {'a': [('c', 2)],
                   'b': [('c', 1)],
                   'c': [('a', 2), ('b', 1)],
                   'd': []}

        # Completeness
        self.g8 = {'a': [('c', 1), ('e', 1)],
                   'b': [('d', 2)],
                   'c': [('a', 1), ('d', 2)],
                   'd': [('b', 2), ('c', 2)],
                   'e': [('a', 1), ('f', 2)],
                   'f': [('e', 2), ('g', 1)],
                   'g': [('f', 1)]}

        self.g9 = {'a': [('c', 1), ('e', 3)],
                   'b': [('g', 1), ('h', 1)],
                   'c': [('a', 1), ('d', 2)],
                   'd': [('c', 2), ('e', 1), ('g', 2)],
                   'e': [('a', 3), ('d', 1), ('f', 1)],
                   'f': [('e', 1), ('g', 2), ('h', 3)],
                   'g': [('d', 2), ('h', 2), ('b', 1)],
                   'h': [('f', 3), ('g', 2), ('b', 1)]}

        # Incomplete graphs
        self.g11 = {}
        self.g12 = {'a': []}
        self.g13 = {'b': []}

    def test_basic_two_point_graph(self):
        """
        Tests when given two points, will go from start to end.
        """
        self.assertEquals(
            Dijkstras().dijkstras(self.g1, 'a', 'b'), (1, ['a', 'b']))

    def test_choose_end_not_random_vertex_graph(self):
        """
        Tests when given 3 points, will choose the right one at the end.
        """
        self.assertEquals(
            Dijkstras().dijkstras(self.g2, 'a', 'b'), (2, ['a', 'b']))

    def test_basic_linear_path_graph(self):
        """
        Tests when there is a path from start to end with at least 1 node in
        the middle, it will find the end.
        """
        self.assertEquals(
            Dijkstras().dijkstras(self.g3, 'a', 'b'),
            (3, ['a', 'c', 'b']))

    def test_small_square_cyclical_graph(self):
        """
        Tests when there is a square cyclical graph, it will choose one of the
        paths to the end.
        """
        distance, path = Dijkstras().dijkstras(self.g4, 'a', 'b')
        self.assertEquals(distance, 2)
        self.assertTrue(path == ['a', 'c', 'b'] or path == ['a', 'd', 'b'],
                        'path was {} instead of {} or {}'.format(
                        path,
                        ['a', 'c', 'b'],
                        ['a', 'd', 'b']))

    def test_small_cycle_inside_of_graph(self):
        """
        Tests the algorithm will not get stuck in a cycle.
        """
        distance, path = Dijkstras().dijkstras(self.g5, 'a', 'b')
        self.assertEquals(distance, 3)
        self.assertTrue(
            path == ['a', 'c', 'e', 'b'] or path == ['a', 'd', 'e', 'b'],
            'path was {} instead of {} or {}'.format(
                path,
                ['a', 'c', 'e', 'b'],
                ['a', 'd', 'e', 'b']))

    def test_end_disconnected_graph(self):
        """
        Tests the algorithm will return an error when the end is not found.
        """
        path = Dijkstras().dijkstras(self.g10, 'a', 'b')
        self.assertTrue(
            'The proclaimed end vertex \'b\' was not reached.' in path,
            'The end was found when it was not supposed to be.\
                The return was \'{}\''.format(path))

    def test_cyclical_and_end_disconnected_graph(self):
        """
        Tests the algorithm will return an error when the end is not found and
        not get stuck in a cycle.
        """
        path = Dijkstras().dijkstras(self.g6, 'a', 'b')
        self.assertTrue(
            'The proclaimed end vertex \'b\' was not reached' in path,
            'The end was found when it was not supposed to be. \
                The return was \'{}\''.format(path))

    def test_random_node_disconnected_graphs(self):
        """
        Tests the algorithm will return a complete path and not get confused
        when a vertex has no edges.
        """
        self.assertEquals(
            Dijkstras().dijkstras(self.g7, 'a', 'b'),
            (3, ['a', 'c', 'b']))

    def test_large_mostly_linear_graph_to_check_multiple_paths(self):
        """
        Tests the algorithm will return a path when on a large and mostly
        linear graph.
        """
        self.assertEquals(
            Dijkstras().dijkstras(self.g8, 'a', 'b'),
            (5, ['a', 'c', 'd', 'b']))

    def test_large_cyclical_graph_to_check_multiple_paths(self):
        """
        Tests the algorithm will return a path when on a large graph with some
        cyclical paths.
        """
        self.assertEquals(
            Dijkstras().dijkstras(self.g9, 'a', 'b'),
            (6, ['a', 'c', 'd', 'g', 'b']))

    def test_no_vertex_in_graph(self):
        """
        Tests an error will return when no vertex is found in the given graph.
        """
        self.assertEquals(
            Dijkstras().dijkstras(self.g11, 'a', 'b'),
            'No vertex found in graph')

    def test_no_end_vertex_in_graph(self):
        """
        Tests an error will return when no vertex is found in the given graph.
        """
        self.assertEquals(
            Dijkstras().dijkstras(self.g12, 'a', 'b'),
            '\'b\' as an end node not found')

    def test_no_start_vertex_in_graph(self):
        """
        Tests an error will return when no ending vertex is found in the given
        graph.
        """
        self.assertEquals(
            Dijkstras().dijkstras(self.g13, 'a', 'b'),
            '\'a\' as a start node not found')
