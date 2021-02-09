import os
import discord
from discord.ext import commands

client = commands.Bot(command_prefix='//')

@client.event
async def on_ready():
    await client.change_presence(activity=discord.Game(name='//help'))
    print('ready')

@client.command()
async def ping(ctx):
    await ctx.send(f'pong {round(client.latency * 1000)}ms')

client.run(os.environ['token'])