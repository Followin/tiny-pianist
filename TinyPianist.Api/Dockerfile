FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

COPY ["TinyPianist.Api/TinyPianist.Api.csproj", "TinyPianist.Api/"]
RUN dotnet restore "TinyPianist.Api/TinyPianist.Api.csproj"

COPY . .
WORKDIR "/src/TinyPianist.Api"

RUN dotnet build "TinyPianist.Api.csproj" -c Release -o /app/build
RUN dotnet publish "TinyPianist.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0
EXPOSE 80
EXPOSE 443

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "TinyPianist.Api.dll"]
