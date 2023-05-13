<script>
    import { Card, MenuButton, Dropdown, DropdownItem, Avatar, Button } from "flowbite-svelte";
  </script>
  <Card padding='sm' class="w-full" size="2xl">
    <div class="flex flex-col items-center pb-4">
      <Avatar size="xl" src="https://placebeard.it/200x200" />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <div class="flex mt-4 space-x-3 lg:mt-6">
          <Button>Add friend</Button>
          <Button color="light" class="dark:text-white">Message</Button>
        </div>
    </div>
  </Card>