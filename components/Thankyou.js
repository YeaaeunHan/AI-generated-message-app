import { useState } from "react";
import { generateAI } from "../pages/api/generate";
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Button,
  Box,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
function Thankyou() {
  const [data, setData] = useState("..awaiting data");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData.entries());
    setIsLoading(true);
    let prompt = "Thank you email about " + formDataObj.emailInput;
    console.log(prompt);
    generateAI(prompt)
      .then((response) => {
        setData(response.data.choices[0].text);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="tweets">
      <form onSubmit={handleSubmit}>
        <FormControl mb="10">
          <FormLabel>Thank you email about .. ?</FormLabel>
          <Input type="text" name="emailInput" />
        </FormControl>
        <Center>
          <Button colorScheme="teal" type="submit">
            Generate
          </Button>
          {isLoading && (
            <CircularProgress isIndeterminate color="green.300" ml="10%" />
          )}
        </Center>
      </form>
      {data.length !== 0 && (
        <Box
          bg="#d4f2f5"
          mt="6"
          borderWidth="1px"
          padding="5"
          borderRadius="lg"
        >
          <TableContainer whiteSpace="normal">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Generated Tweet</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Text wordBreak="break-word">{data}</Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
}
export default Thankyou;
