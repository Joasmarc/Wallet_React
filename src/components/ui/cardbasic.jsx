import { Card } from "@chakra-ui/react"
import { Avatar } from "./avatar"
import { Button } from "./button"

export const CardBasic = () => {
  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Avatar
          src="https://picsum.photos/200/300"
          name="Nue Camp"
          size="lg"
          shape="rounded"
        />
        <Card.Title mt="2">Nue Camp</Card.Title>
        <Card.Description>
          Curabitur nec odio vel dui euismod fermentum.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
      </Card.Footer>
    </Card.Root>
  )
}
