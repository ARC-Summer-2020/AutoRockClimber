import unittest
import time
from decisionengine.dijkstras import Dijkstras

# Class that time tests the graphs for dijkstras algorithm
# Completeness

class DijkstrasTimeTest(unittest.TestCase):
    def setUp(self):

        #Graph with 26 Nodes
        self.g1 = {'a': [('b', 1), ('c', 3)],

                   'b': [('a', 1), ('c', 3), ('e', 2), ('i', 1)],

                   'c': [('a', 3), ('b', 1), ('d', 2)],

                   'd': [('c', 2), ('e', 1), ('f', 2), ('g', 2),('h',1)],

                   'e': [('d', 1), ('b', 2), ('h', 1)],

                   'f': [('d', 2), ('g', 3), ('p', 3)],

                   'g': [('d', 2), ('e', 1), ('p', 2), ('h', 2)],

                   'h': [('e', 1), ('d', 2), ('l', 2)],
                   
                   'i': [('b', 1), ('j', 1), ('k', 3)],
                   
                   'j': [('i', 1), ('l', 1)],
                   
                   'k': [('i', 3), ('m', 1)],
                   
                   'l': [('h', 2), ('j', 1), ('s', 1)],
                   
                   'm': [('k', 1), ('n', 1)],
                   
                   'n': [('m', 1), ('o', 2)],
                   
                   'o': [('n', 2), ('w', 6)],
                   
                   'p': [('f', 3), ('g', 1), ('q', 1)],
                   
                   'q': [('r', 2), ('p', 1)],
                   
                   'r': [('q', 1), ('v', 2)],
                   
                   's': [('l', 1), ('t', 1)],
                   
                   't': [('s', 1), ('v', 2), ('u', 1)],
                   
                   'u': [('t', 1), ('w', 1)],
                   
                   'v': [('t', 2), ('r', 2), ('x', 1)],
                   
                   'w': [('o', 6), ('u', 1), ('z', 1)],
                   
                   'x': [('v', 1), ('z', 1)],
                   
                   'z': [('x', 1), ('w', 1)]

                    }
        #Graph with 52 nodes

        self.g2 = {'a': [('aLeft', 3), ('b', 1), ('c', 3)],

                   'b': [('a', 1), ('c', 3), ('e', 2), ('i', 1)],

                   'c': [('a', 3), ('b', 1), ('d', 2)],

                   'd': [('c', 2), ('e', 1), ('f', 2), ('g', 2),('h',1)],

                   'e': [('d', 1), ('b', 2), ('h', 1)],

                   'f': [('d', 2), ('g', 3), ('p', 3)],

                   'g': [('d', 2), ('e', 1), ('p', 2), ('h', 2)],

                   'h': [('e', 1), ('d', 2), ('l', 2)],
                   
                   'i': [('b', 1), ('j', 1), ('k', 3)],
                   
                   'j': [('i', 1), ('l', 1)],
                   
                   'k': [('i', 3), ('m', 1)],
                   
                   'l': [('h', 2), ('j', 1), ('s', 1)],
                   
                   'm': [('k', 1), ('n', 1)],
                   
                   'n': [('m', 1), ('o', 2)],
                   
                   'o': [('n', 2), ('w', 6)],
                   
                   'p': [('f', 3), ('g', 1), ('q', 1)],
                   
                   'q': [('r', 2), ('p', 1)],
                   
                   'r': [('q', 1), ('v', 2)],
                   
                   's': [('l', 1), ('t', 1)],
                   
                   't': [('s', 1), ('v', 2), ('u', 1)],
                   
                   'u': [('t', 1), ('w', 1)],
                   
                   'v': [('t', 2), ('r', 2), ('x', 1)],
                   
                   'w': [('o', 6), ('u', 1), ('z', 1)],
                   
                   'x': [('v', 1), ('z', 1)],
                   
                   'z': [('x', 1), ('w', 1)], 

                   'aLeft': [('a', 3),('bLeft', 1), ('cLeft', 3)],

                   'bLeft': [('aLeft', 1), ('cLeft', 3), ('eLeft', 2), ('iLeft', 1)],

                   'cLeft': [('aLeft', 3), ('bLeft', 1), ('dLeft', 2)],

                   'dLeft': [('cLeft', 2), ('eLeft', 1), ('fLeft', 2), ('gLeft', 2),('hLeft',1)],

                   'eLeft': [('dLeft', 1), ('bLeft', 2), ('hLeft', 1)],

                   'fLeft': [('dLeft', 2), ('gLeft', 3), ('pLeft', 3)],

                   'gLeft': [('dLeft', 2), ('eLeft', 1), ('pLeft', 2), ('hLeft', 2)],

                   'hLeft': [('eLeft', 1), ('dLeft', 2), ('lLeft', 2)],
                   
                   'iLeft': [('bLeft', 1), ('jLeft', 1), ('kLeft', 3)],
                   
                   'jLeft': [('iLeft', 1), ('lLeft', 1)],
                   
                   'kLeft': [('iLeft', 3), ('mLeft', 1)],
                   
                   'lLeft': [('hLeft', 2), ('jLeft', 1), ('sLeft', 1)],
                   
                   'mLeft': [('kLeft', 1), ('nLeft', 1)],
                   
                   'nLeft': [('mLeft', 1), ('oLeft', 2)],
                   
                   'oLeft': [('nLeft', 2), ('wLeft', 6)],
                   
                   'pLeft': [('fLeft', 3), ('gLeft', 1), ('qLeft', 1)],
                   
                   'qLeft': [('rLeft', 2), ('pLeft', 1)],
                   
                   'rLeft': [('qLeft', 1), ('vLeft', 2)],
                   
                   'sLeft': [('lLeft', 1), ('tLeft', 1)],
                   
                   'tLeft': [('sLeft', 1), ('vLeft', 2), ('uLeft', 1)],
                   
                   'uLeft': [('tLeft', 1), ('wLeft', 1)],
                   
                   'vLeft': [('tLeft', 2), ('rLeft', 2), ('xLeft', 1)],
                   
                   'wLeft': [('oLeft', 6), ('uLeft', 1), ('zLeft', 1)],
                   
                   'xLeft': [('vLeft', 1), ('zLeft', 1)],
                   
                   'zLeft': [('xLeft', 1), ('wLeft', 1)]
                    }
          
        # Test with 78 Nodes
        self.g3 = {'a': [('aLeft', 3),('aRight', 2), ('b', 1), ('c', 3)],

                   'b': [('a', 1), ('c', 3), ('e', 2), ('i', 1)],

                   'c': [('a', 3), ('b', 1), ('d', 2)],

                   'd': [('c', 2), ('e', 1), ('f', 2), ('g', 2),('h',1)],

                   'e': [('d', 1), ('b', 2), ('h', 1)],

                   'f': [('d', 2), ('g', 3), ('p', 3)],

                   'g': [('d', 2), ('e', 1), ('p', 2), ('h', 2)],

                   'h': [('e', 1), ('d', 2), ('l', 2)],
                   
                   'i': [('b', 1), ('j', 1), ('k', 3)],
                   
                   'j': [('i', 1), ('l', 1)],
                   
                   'k': [('i', 3), ('m', 1)],
                   
                   'l': [('h', 2), ('j', 1), ('s', 1)],
                   
                   'm': [('k', 1), ('n', 1)],
                   
                   'n': [('m', 1), ('o', 2)],
                   
                   'o': [('n', 2), ('w', 6)],
                   
                   'p': [('f', 3), ('g', 1), ('q', 1)],
                   
                   'q': [('r', 2), ('p', 1)],
                   
                   'r': [('q', 1), ('v', 2)],
                   
                   's': [('l', 1), ('t', 1)],
                   
                   't': [('s', 1), ('v', 2), ('u', 1)],
                   
                   'u': [('t', 1), ('w', 1)],
                   
                   'v': [('t', 2), ('r', 2), ('x', 1)],
                   
                   'w': [('o', 6), ('u', 1), ('z', 1)],
                   
                   'x': [('v', 1), ('z', 1)],
                   
                   'z': [('x', 1), ('w', 1)], 

                   'aLeft': [('a', 3),('bLeft', 1), ('cLeft', 3)],

                   'bLeft': [('aLeft', 1), ('cLeft', 3), ('eLeft', 2), ('iLeft', 1)],

                   'cLeft': [('aLeft', 3), ('bLeft', 1), ('dLeft', 2)],

                   'dLeft': [('cLeft', 2), ('eLeft', 1), ('fLeft', 2), ('gLeft', 2),('hLeft',1)],

                   'eLeft': [('dLeft', 1), ('bLeft', 2), ('hLeft', 1)],

                   'fLeft': [('dLeft', 2), ('gLeft', 3), ('pLeft', 3)],

                   'gLeft': [('dLeft', 2), ('eLeft', 1), ('pLeft', 2), ('hLeft', 2)],

                   'hLeft': [('eLeft', 1), ('dLeft', 2), ('lLeft', 2)],
                   
                   'iLeft': [('bLeft', 1), ('jLeft', 1), ('kLeft', 3)],
                   
                   'jLeft': [('iLeft', 1), ('lLeft', 1)],
                   
                   'kLeft': [('iLeft', 3), ('mLeft', 1)],
                   
                   'lLeft': [('hLeft', 2), ('jLeft', 1), ('sLeft', 1)],
                   
                   'mLeft': [('kLeft', 1), ('nLeft', 1)],
                   
                   'nLeft': [('mLeft', 1), ('oLeft', 2)],
                   
                   'oLeft': [('nLeft', 2), ('wLeft', 6)],
                   
                   'pLeft': [('fLeft', 3), ('gLeft', 1), ('qLeft', 1)],
                   
                   'qLeft': [('rLeft', 2), ('pLeft', 1)],
                   
                   'rLeft': [('qLeft', 1), ('vLeft', 2)],
                   
                   'sLeft': [('lLeft', 1), ('tLeft', 1)],
                   
                   'tLeft': [('sLeft', 1), ('vLeft', 2), ('uLeft', 1)],
                   
                   'uLeft': [('tLeft', 1), ('wLeft', 1)],
                   
                   'vLeft': [('tLeft', 2), ('rLeft', 2), ('xLeft', 1)],
                   
                   'wLeft': [('oLeft', 6), ('uLeft', 1), ('zLeft', 1)],
                   
                   'xLeft': [('vLeft', 1), ('zLeft', 1)],
                   
                   'zLeft': [('xLeft', 1), ('wLeft', 1)],

                   'aRight': [('a', 2),('bRight', 1), ('cRight', 3)],

                   'bRight': [('aRight', 1), ('cRight', 3), ('eRight', 2), ('iRight', 1)],

                   'cRight': [('aRight', 3), ('bRight', 1), ('dRight', 2)],

                   'dRight': [('cRight', 2), ('eRight', 1), ('fRight', 2), ('gRight', 2),('hRight',1)],

                   'eRight': [('dRight', 1), ('bRight', 2), ('hRight', 1)],

                   'fRight': [('dRight', 2), ('gRight', 3), ('pRight', 3)],

                   'gRight': [('dRight', 2), ('eRight', 1), ('pRight', 2), ('hRight', 2)],

                   'hRight': [('eRight', 1), ('dRight', 2), ('lRight', 2)],
                   
                   'iRight': [('bRight', 1), ('jRight', 1), ('kRight', 3)],
                   
                   'jRight': [('iRight', 1), ('lRight', 1)],
                   
                   'kRight': [('iRight', 3), ('mRight', 1)],
                   
                   'lRight': [('hRight', 2), ('jRight', 1), ('sRight', 1)],
                   
                   'mRight': [('kRight', 1), ('nRight', 1)],
                   
                   'nRight': [('mRight', 1), ('oRight', 2)],
                   
                   'oRight': [('nRight', 2), ('wRight', 6)],
                   
                   'pRight': [('fRight', 3), ('gRight', 1), ('qRight', 1)],
                   
                   'qRight': [('rRight', 2), ('pRight', 1)],
                   
                   'rRight': [('qRight', 1), ('vRight', 2)],
                   
                   'sRight': [('lRight', 1), ('tRight', 1)],
                   
                   'tRight': [('sRight', 1), ('vRight', 2), ('uRight', 1)],
                   
                   'uRight': [('tRight', 1), ('wRight', 1)],
                   
                   'vRight': [('tRight', 2), ('rRight', 2), ('xRight', 1)],
                   
                   'wRight': [('oRight', 6), ('uRight', 1), ('zRight', 1)],
                   
                   'xRight': [('vRight', 1), ('zRight', 1)],
                   
                   'zRight': [('xRight', 1), ('wRight', 1)]
                   }
                   
        self.g4 = {(1,1): [((1,2), 1)],
                   (1,2): [((1,1),1), ((2,1), 1)],
                   (2,1): [((1,2), 1)]
                  }

# Testing 1 path - graph with 26 nodes
    def test_graph1(self):
        tic = time.perf_counter()
           
        self.assertEqual(Dijkstras().dijkstras(self.g1, 'a', 'z'), (9, ['a', 'b', 'i', 'j', 'l', 's', 't', 'u', 'w', 'z']))
        
        toc = time.perf_counter()
        
        print(f"Graph 1 Dijkstras Test - 26 nodes {toc - tic:0.4f} seconds")

#Testing 2 paths - graph with 52 nodes
    def test_graph2(self):
        tic = time.perf_counter()
           
        self.assertEqual(Dijkstras().dijkstras(self.g2, 'a', 'z'), (9, ['a', 'b', 'i', 'j', 'l', 's', 't', 'u', 'w', 'z']))
        
        toc = time.perf_counter()
        
        print(f"Graph 2 Dijkstras Test - 52 nodes {toc - tic:0.4f} seconds")

#Testing 3 paths - full graph with 78 nodes
    def test_graph3(self):
        tic = time.perf_counter()
           
        self.assertEqual(Dijkstras().dijkstras(self.g3, 'a', 'z'), (9, ['a', 'b', 'i', 'j', 'l', 's', 't', 'u', 'w', 'z']))
        
        toc = time.perf_counter()
        
        print(f"Graph 3 Dijkstras Test - 78 nodes {toc - tic:0.4f} seconds")  

#Testing tuples
    def test_graph4(self):
        tic = time.perf_counter()
        
        self.assertEqual(Dijkstras().dijkstras(self.g4, (1,1), (2,1)), ( 2, [(1,1), (1,2), (2,1),]))
         
        toc = time.perf_counter()
        
        print(f"Graph 4 Dijkstras Test with Tuple {toc - tic:0.4f} seconds")  
    
if __name__ == '__main__':
    unittest.main()