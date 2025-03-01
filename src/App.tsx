import { useState } from "react";
import { 
  Heading, 
  Box, 
  Button, 
  Input, 
  VStack, 
  HStack, 
  Icon, 
  createListCollection, 
  Container, 
  Text, 
  Flex,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./components/ui/select"
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import CopyArray from "./myComponents/copyArray";
import { FaCheckCircle, FaRandom, FaPlay, FaTrash, FaPlus, FaRedo } from "react-icons/fa";
import { SortAlgorithm } from "./enum";
import { generateRandomArray } from "./utils";
import { nanoid } from 'nanoid';
import { bubbleSort, selectionSort, quickSort } from "./sortFuncModuel";
import { CodeModalButton } from "./myComponents/CodeModalButton";

export type SortableItem = {
  id: string;
  value: number;
};

const algorithms = createListCollection({
  items: [
    { value: SortAlgorithm.QUICK_SORT, label: "Quick Sort" },
    { value: SortAlgorithm.BUBBLE_SORT, label: "Bubble Sort" },
    { value: SortAlgorithm.SELECTION_SORT, label: "Selection Sort" },
  ]
})

// Styles for elements
const buttonStyles = {
  transition: "all 0.3s",
  _hover: { transform: "translateY(-2px)", boxShadow: "lg" },
  _active: { transform: "translateY(0)" },
};

function App() {
  const [array, setArray] = useState<SortableItem[]>([]);
  const [arrayCopy, setArrayCopy] = useState<SortableItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [sortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm>(SortAlgorithm.QUICK_SORT);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  // Color schemes for dark mode
  const bgColor = "#121212"; // Almost black
  const cardBgColor = "#1E1E1E"; // Dark gray cards
  const accentColor = "#4CAF50"; // Calm green
  const textColor = "#F5F5F5"; // Almost white
  const successColor = "#81C784"; // Soft lime green

  // Styles for array elements
  const arrayItemStyle = {
    padding: "8px 12px",
    background: accentColor,
    color: textColor,
    borderRadius: "8px",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontWeight: "bold",
  };

  const handleRandomize = () => {
    const randomArray = [...generateRandomArray(20)]
    setArray(randomArray);
    setArrayCopy([...randomArray]);
    setIsSorted(false);
  };

  const handleAplyAgain = () => {
    setArray([...arrayCopy]);
    setIsSorted(false);
  };

  const handleClear = () => {
    setArray([]);
    setIsSorted(false);
    setTimeElapsed(0);
    setArrayCopy([]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddNumber = () => {
    const num = Number(inputValue.trim());
    if (!isNaN(num)) {
      setArray((prev) => [...prev, { id: nanoid(), value: num }]);
      setInputValue("");
      setIsSorted(false);
    }
  };

  const handleSort = async () => {
    setIsSorting(true);
    setTimeElapsed(0);

    const startTime = performance.now();

    switch (sortAlgorithm) {
      case SortAlgorithm.QUICK_SORT:
        await quickSort(array, 0, array.length - 1, setArray);
        break;
      case SortAlgorithm.BUBBLE_SORT:
        await bubbleSort(array, setArray);
        break;
      case SortAlgorithm.SELECTION_SORT:
        await selectionSort(array, setArray);
        break;
      default:
        break;
    }

    const endTime = performance.now();
    setTimeElapsed(+((endTime - startTime) / 1000).toFixed(2));

    setIsSorting(false);
    setIsSorted(true);
  };

  return (
    <Box bg={bgColor} minH="100vh" color={textColor} py={4}>
      <Container maxW="container.lg">
        <VStack gap={5}>
          <Heading 
            fontSize="4xl" 
            style={{ fontFamily: 'monospace', color: 'white' }}
            textAlign="center" 
            mb={2}
            bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
            bgClip="text"
            fontWeight="bold"
          >
            Algorithm Visualizer
          </Heading>
          
          <Box 
            w="100%" 
            bg={cardBgColor} 
            p={4} 
            borderRadius="xl" 
            boxShadow="xl"
            border="1px"
            borderColor="whiteAlpha.200"
          >
            <VStack gap={3} align="stretch">
              <Flex justifyContent="space-between" alignItems="center">
                <CopyArray array={arrayCopy} />
                <Button 
                  onClick={handleAplyAgain} 
                  disabled={isSorting}
                  colorScheme="purple" 
                  {...buttonStyles}
                >
                  <Box mr={2}><FaRedo /></Box>
                  Apply Again
                </Button>
              </Flex>
              
              <Button 
                onClick={handleRandomize} 
                width="100%" 
                disabled={isSorting}
                colorScheme="blue" 
                size="lg"
                {...buttonStyles}
              >
                <Box mr={2}><FaRandom /></Box>
                Random Array
              </Button>
              
              <HStack>
                <Input
                  placeholder="Enter a number"
                  value={inputValue}
                  onChange={handleInputChange}
                  disabled={isSorting}
                  bg="whiteAlpha.100"
                  borderColor="whiteAlpha.300"
                  _hover={{ borderColor: "blue.300" }}
                  _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #4299E1" }}
                />
                <Button 
                  onClick={handleAddNumber} 
                  disabled={isSorting || !inputValue.trim()}
                  colorScheme="teal" 
                  {...buttonStyles}
                >
                  <Box mr={2}><FaPlus /></Box>
                  Add
                </Button>
                <Button 
                  onClick={handleClear} 
                  disabled={isSorting}
                  colorScheme="red" 
                  variant="outline"
                  {...buttonStyles}
                >
                  <Box mr={2}><FaTrash /></Box>
                  Clear
                </Button>
              </HStack>
              
              <Flex justifyContent="space-between" alignItems="center">
                <Box w="60%">
                  <SelectRoot 
                    collection={algorithms} 
                    defaultValue={[sortAlgorithm]} 
                    size="md" 
                    disabled={isSorting}
                  >
                    <SelectLabel fontWeight="medium">Select Algorithm</SelectLabel>
                    <SelectTrigger 
                      bg="whiteAlpha.100"
                      borderColor="whiteAlpha.300"
                      _hover={{ borderColor: "blue.300" }}
                    >
                      <SelectValueText placeholder="Select Algorithm" />
                    </SelectTrigger>
                    <SelectContent bg={cardBgColor} borderColor="whiteAlpha.300">
                      {algorithms.items.map((algorithm) => (
                        <SelectItem
                          item={algorithm}
                          key={algorithm.value}
                          onClick={() => setSortAlgorithm(algorithm.value)}
                          _hover={{ bg: "whiteAlpha.200" }}
                        >
                          {algorithm.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Box>
                <CodeModalButton algorithm={sortAlgorithm} />
              </Flex>
              
              <Button 
                onClick={handleSort} 
                disabled={isSorting || array.length < 2 || isSorted}
                colorScheme="green" 
                size="lg"
                {...buttonStyles}
              >
                <Box mr={2}><FaPlay /></Box>
                Start Sorting
              </Button>
            </VStack>
          </Box>
          
          <Box 
            w="100%" 
            bg={cardBgColor} 
            p={4} 
            borderRadius="xl" 
            boxShadow="xl"
            border="1px"
            borderColor="whiteAlpha.200"
            minH="150px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="lg" mb={4} fontWeight="medium">Array Visualization:</Text>
            <Flex flexWrap="wrap" gap={3} justifyContent="center">
              <AnimatePresence mode="popLayout">
                {array.length > 0 ? array.map((item) => (
                  <motion.div
                    layoutId={item.id + item.value}
                    key={item.id}
                    animate={{ y: 0, opacity: 1 }}
                    initial={{ y: -20, opacity: 0 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={arrayItemStyle}
                  >
                    {item.value}
                  </motion.div>
                )) : (
                  <motion.div 
                    style={{
                      padding: "16px 24px",
                      background: "rgba(66, 153, 225, 0.2)",
                      color: textColor,
                      borderRadius: "8px",
                      whiteSpace: "nowrap",
                      border: "1px dashed",
                      borderColor: accentColor
                    }} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.5 }}
                  >
                    No numbers to sort
                  </motion.div>
                )}
              </AnimatePresence>
            </Flex>
          </Box>
          
          {isSorted && (
            <Flex 
              direction="column" 
              alignItems="center" 
              bg={cardBgColor}
              p={4}
              borderRadius="xl"
              boxShadow="lg"
              border="1px"
              borderColor="whiteAlpha.200"
              w="fit-content"
              mx="auto"
            >
              <Icon as={FaCheckCircle} color={successColor} fontSize="4xl" mb={2} />
              <Box 
                bg={successColor} 
                color="white" 
                p={2} 
                borderRadius="md" 
                fontSize="md"
              >
                Sorting completed in {timeElapsed} sec
              </Box>
            </Flex>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default App;

