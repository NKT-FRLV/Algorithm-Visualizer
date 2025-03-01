import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
  import { dracula} from 'react-syntax-highlighter/dist/esm/styles/prism'
  import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

  import { SortAlgorithm } from "../enum"

  import { quickSort, partition, bubbleSort, selectionSort } from "../sortFuncModuel"



  import { Button, DialogActionTrigger } from "@chakra-ui/react"

  interface CodeModalButtonProps {
    algorithm: string;
  }

  export const CodeModalButton = ({ algorithm }: CodeModalButtonProps) => {
    const getAlgorithmCode = () => {
      switch (algorithm) {
        case SortAlgorithm.QUICK_SORT:
          return `const quickSort = ${quickSort.toString()}\n\nconst partition = ${partition.toString()}`;
        case SortAlgorithm.BUBBLE_SORT:
          return `const bubbleSort = ${bubbleSort.toString()}`;
        case SortAlgorithm.SELECTION_SORT:
          return `const selectionSort = ${selectionSort.toString()}`;
        default:
          return 'Algorithm not found';
      }
    };

    return (
      <DialogRoot size='lg' placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Button size="sm">
            Show Algorithm
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle fontSize='16px' fontWeight='bold' color='black'>
                {algorithm} in TypeScript
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
              <SyntaxHighlighter
                language='typescript'
                style={dracula}
                showLineNumbers
              >
                {getAlgorithmCode()}
              </SyntaxHighlighter>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">OKEY</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    )
  }