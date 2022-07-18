import { useState } from "react";
import { useRouter } from "next/router";
import { GoSearch } from "react-icons/go";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Icon,
} from "@chakra-ui/react";

export default function Searchbar({ setSearch }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(query);
    setQuery("");
    router.push("/usercollection");
  };

  const ethAddRegEx = /^0x[a-fA-F0-9]{40}$/;
  const ethAddTest = ethAddRegEx.test(query);
  const isError = query != "" && !ethAddTest;

  return (
    <form onSubmit={(event) => handleSearch(event)}>
      <FormControl isInvalid={isError}>
        <InputGroup>
          <Input
            variant="outline"
            size="md"
            w={{ base: "300px", sm: "450px" }}
            value={query}
            onChange={(event) => handleQuery(event)}
            _invalid={{ borderColor: "red.400" }}
          />
          <InputRightElement
            children={
              <Button
                isDisabled={!ethAddTest}
                variant="ghost"
                size="sm"
                type="submit"
                _hover={{ background: "none" }}
              >
                <Icon as={GoSearch} />
              </Button>
            }
          />
        </InputGroup>
        {!isError ? (
          <FormHelperText fontSize="xs">
            Enter ETH wallet address here (eg. 0x1a2b...)
          </FormHelperText>
        ) : (
          <FormErrorMessage fontSize="xs" color="red.400">
            Please enter a valid ETH wallet address
          </FormErrorMessage>
        )}
      </FormControl>
    </form>
  );
}
