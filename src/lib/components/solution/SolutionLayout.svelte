<script lang="ts">

  import LeftMenuLayout from "../shared/LeftMenuLayout.svelte";
  export let solution: any = null;

  let menuItems: any[] = [];

  $: {
    if (solution) {
      menuItems = [
        {
          title: "Solution Overview",
          icon: "fas fa-lightbulb text-primary-400",
          href: `/solution/${solution.id}`,
        },
        {
          title: "Discussions",
          icon: "fa-solid fa-comment text-green-400",
          href: `/solution/${solution.id}/discussion`,
        },
        {
          title: "Announcements",
          icon: "fas fa-bullhorn text-yellow-400",
        },
        {
          title: "Features",
          icon: "fa-brands fa-trello  text-primary-600",
          href: `/solution/${solution.id}/followers`,
        },
        {
          title: "Team Members",
          icon: "fa fa-users text-blue-400",
          href: `/problem/show/${solution.id}/followers`,
        },
     
      ];
    }
  }

</script>
<LeftMenuLayout {menuItems}>  
    <slot></slot> 
</LeftMenuLayout>