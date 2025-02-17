import asyncio
async def task():
    print("Starting task")
    await asyncio.sleep(1)  # Simulate a delay
    print("Task finished")
# Run the event loop
asyncio.run(task())